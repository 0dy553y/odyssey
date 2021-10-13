import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import CategoryHeader from '../../components/category/CategoryHeader';
import CategoryListItem from '../../components/category/CategoryListItem';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'store';
import { getCategory } from 'store/categories/selectors';
import { loadAllChallenges } from 'store/challenges/operations';
import { getChallengeList } from 'store/challenges/selectors';
import { getHeadingFromCategory } from 'utils/naming';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
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
    dispatch(loadAllChallenges());
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const challenges = useSelector((state: RootState) =>
    getChallengeList(state)
  )!;

  if (!category) {
    return <Skeleton />;
  }

  return (
    <Box>
      <CategoryHeader
        title={category.title}
        heading={getHeadingFromCategory(category.title)}
      />
      <Box>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="All challenges" />
          <StyledTab label="Ongoing" />
        </StyledTabs>
        <Box sx={{ p: 3 }} />
      </Box>
      <ul>
        {challenges.map((challenge) => (
          <li key={challenge.id}>
            <CategoryListItem
              name={challenge.name}
              duration={challenge.duration}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default ExplorePage;
