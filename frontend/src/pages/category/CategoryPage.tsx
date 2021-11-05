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
import { styled } from '@mui/material/styles';
import { ReactComponent as BackArrow } from 'assets/icons/arrow-left.svg';
import CategoryListItem from '../../components/category/CategoryListItem';
import { batch, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { RootState } from 'store';
import { getCategory } from 'store/categories/selectors';
import { loadAllChallenges } from 'store/challenges/operations';
import { loadCategory } from 'store/categories/operations';
import { getChallengeList } from 'store/challenges/selectors';
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

const CategoryPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { categoryId } = useParams<{ categoryId: string }>();

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

  return (
    <Box>
      <Stack
        sx={{
          backgroundImage: `
            linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%),
            url(${headerImage.default})
          `,
          backgroundSize: 'cover',
          height: '40vh',
          borderRadius: '0 0 5vh 5vh',
          ...getImageHeaderPosition(category.title),
        }}
        justifyContent="space-between"
      >
        <AppBar position="static">
          <Toolbar>
            <Box
              onClick={() => {
                history.goBack();
              }}
            >
              <IconButton edge="start" sx={{ color: 'white', padding: '1em' }}>
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
        <StyledTab label="All challenges" />
        <StyledTab label="Curated" />
      </StyledTabs>

      <Box sx={{ p: 1 }} />

      <Box sx={{ padding: '0 1.5em 0 1.5em' }}>
        <ul>
          {challenges
            .filter((challenge) => challenge.categoryId == category.id)
            .map((challenge) => (
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
            ))}
        </ul>
      </Box>
    </Box>
  );
};

export default CategoryPage;
