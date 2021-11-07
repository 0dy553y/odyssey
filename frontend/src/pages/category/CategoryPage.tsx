import React, { useEffect } from 'react';
import {
  AppBar,
  Box,
  Tab,
  Tabs,
  Typography,
  IconButton,
  Toolbar,
  Stack,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled, Theme } from '@mui/material/styles';
import { ReactComponent as BackArrow } from 'assets/icons/arrow-left.svg';
import CategoryListItem from '../../components/category/CategoryListItem';
import { batch, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { RootState } from 'store';
import { getCategory } from 'store/categories/selectors';
import {
  loadAllChallenges,
  loadPopularChallenges,
} from 'store/challenges/operations';
import { loadCategory } from 'store/categories/operations';
import {
  getChallengeList,
  getPopularChallengeList,
} from 'store/challenges/selectors';
import { getHeadingFromCategory } from 'utils/naming';
import { CHALLENGE_ROUTE } from 'routing/routes';
import {
  loadAllOngoingUserChallenges,
  loadAllCompletedUserChallenges,
} from 'store/userchallenges/operations';
import {
  getAllOngoingUserChallenges,
  getAllCompletedUserChallenges,
} from 'store/userchallenges/selectors';
import { getChallengePercentageComplete } from 'utils/progress';
import LoadingPage from 'pages/loading/LoadingPage';
import { useIsDesktop } from 'utils/windowSize';
import { ChallengeListData } from 'types/challenges';

interface StyledTabProps {
  label: string;
}

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: '5px',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 50,
    width: '100%',
    backgroundColor: '#635ee7',
  },
  boxShadow: 'inset 0px -5px 0 0 #e8e8e8',
});

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: '1em',
  color: 'rgba(0, 0, 0, 0.5)',
  '&.Mui-selected': {
    color: '#000',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(0, 0, 0, 0.32)',
  },
}));

const useStyles = makeStyles<Theme>((theme) => ({
  desktopCategoryCoverContainer: {
    margin: theme.spacing(3),
    borderRadius: '5vh',
  },
  mobileCategoryCoverContainer: {
    borderRadius: '0 0 5vh 5vh',
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const CategoryPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { categoryId } = useParams<{ categoryId: string }>();
  const classes = useStyles();

  const isDesktop = useIsDesktop();

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const category = useSelector((state: RootState) =>
    getCategory(state, Number(categoryId))
  )!;

  useEffect(() => {
    batch(() => {
      dispatch(loadCategory(Number(categoryId)));
      dispatch(loadAllChallenges());
      dispatch(loadPopularChallenges(Number(categoryId)));
      dispatch(loadAllOngoingUserChallenges());
      dispatch(loadAllCompletedUserChallenges());
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const challenges = useSelector((state: RootState) =>
    getChallengeList(state)
  )!;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ongoingChallenges = useSelector((state: RootState) =>
    getAllOngoingUserChallenges(state)
  )!;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const popularChallenges = useSelector((state: RootState) =>
    getPopularChallengeList(state)
  )!;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const completedChallenges = useSelector((state: RootState) =>
    getAllCompletedUserChallenges(state)
  )!;

  if (!category) {
    return <LoadingPage />;
  }

  /* eslint-disable */
  const headerImage = require('../../assets/images/' +
    category.title.toLowerCase() +
    '.png');

  const defaultImageHeaderPosition = {
    backgroundPosition: '20% 30%',
  };
  const lowerImageHeaderPosition = {
    backgroundPosition: '20% 60%',
  };

  const getImageHeaderPosition = (title: string) => {
    switch (title) {
      case 'Mindfulness':
      case 'Habits':
        return lowerImageHeaderPosition;
      default:
        return defaultImageHeaderPosition;
    }
  };

  const displayChallenges = (challengeList: ChallengeListData[]) => {
    return challengeList.map((challenge) => (
      <li key={challenge.id}>
        <CategoryListItem
          name={challenge.name}
          duration={challenge.duration}
          percentageComplete={getChallengePercentageComplete(
            challenge.id,
            completedChallenges,
            ongoingChallenges
          )}
          onClick={() =>
            history.push(`${CHALLENGE_ROUTE}/${challenge.id}`, {
              challenge: challenge,
            })
          }
        />
      </li>
    ));
  };

  return (
    <Box>
      <Stack
        className={
          isDesktop
            ? classes.desktopCategoryCoverContainer
            : classes.mobileCategoryCoverContainer
        }
        sx={{
          backgroundImage: `
            linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%),
            url(${headerImage.default})
          `,
          backgroundSize: 'cover',
          height: '40vh',
          ...getImageHeaderPosition(category.title),
        }}
        justifyContent="space-between"
      >
        <AppBar position="static">
          <Toolbar>
            <Box>
              <IconButton
                edge="start"
                sx={{ color: 'white', padding: '1em' }}
                onClick={() => {
                  history.goBack();
                }}
              >
                <BackArrow height="1.5em" width="1.5em" />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ color: 'white', paddingLeft: '2em' }}>
          <Typography variant="h5">I want to...</Typography>
          <Typography
            variant="h1"
            sx={{ paddingBottom: '0.5em', fontFamily: 'Frock' }}
          >
            {getHeadingFromCategory(category.title)}
          </Typography>
        </Box>
      </Stack>

      <StyledTabs value={value} onChange={handleChange}>
        <StyledTab label="All challenges" {...a11yProps(0)} />
        <StyledTab label="Popular" {...a11yProps(1)} />
      </StyledTabs>
      <TabPanel value={value} index={0}>
        <ul>
          {displayChallenges(
            challenges.filter(
              (challenge) => challenge.categoryId == category.id
            )
          )}
        </ul>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ul>{displayChallenges(popularChallenges)}</ul>
      </TabPanel>
    </Box>
  );
};

export default CategoryPage;
