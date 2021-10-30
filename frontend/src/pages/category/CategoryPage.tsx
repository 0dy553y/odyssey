import React, { useEffect } from 'react';
import {
  AppBar,
  Box,
  Skeleton,
  Tab,
  Tabs,
  IconButton,
  Toolbar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactComponent as BackArrow } from 'assets/icons/arrow-left.svg';
import CategoryHeader from '../../components/category/CategoryHeader';
import CategoryListItem from '../../components/category/CategoryListItem';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';
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

const ExplorePage: React.FC = () => {
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
    dispatch(loadCategory(Number(categoryId)));
    dispatch(loadAllChallenges());
    dispatch(loadAllOngoingUserChallenges());
    dispatch(loadAllCompletedUserChallenges());
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
    return <Skeleton />;
  }

  return (
    <Box>
      <AppBar position="absolute">
        <Toolbar>
          <div
            onClick={() => {
              history.goBack();
            }}
          >
            <IconButton edge="start" sx={{ color: 'white', padding: '1em' }}>
              <BackArrow height="1.5em" width="1.5em" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <CategoryHeader
        title={category.title}
        heading={getHeadingFromCategory(category.title)}
      />
      <Box
        sx={{
          paddingBottom: '-2em',
          position: 'relative',
          margin: '0 -50vw -2em -50vw',
          maxWidth: '100vw',
          maxHeight: '55vh',
          left: '50%',
          right: '50%',
          width: '100vw',
        }}
      >
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="All challenges" />
          <StyledTab label="Curated" />
        </StyledTabs>
        <Box sx={{ p: 3 }} />
      </Box>
      <Box sx={{ padding: '0 1.5em 0 1.5em' }}>
        <ul>
          {challenges
            .filter((challenge) => challenge.categoryId == category.id)
            .map((challenge) => (
              <li key={challenge.id}>
                <Link
                  to={{
                    pathname: `${CHALLENGE_ROUTE}/${challenge.id}`,
                    state: { challenge: challenge },
                  }}
                  style={{ textDecoration: 'none' }}
                >
                  <CategoryListItem
                    name={challenge.name}
                    duration={challenge.duration}
                    percentageComplete={getChallengePercentageComplete(
                      challenge.id,
                      completedChallenges,
                      ongoingChallenges
                    )}
                  />
                </Link>
              </li>
            ))}
        </ul>
      </Box>
    </Box>
  );
};

export default ExplorePage;
