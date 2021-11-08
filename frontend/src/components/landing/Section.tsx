import React from 'react';
import { Box, Typography, Theme } from '@mui/material';
import { InView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { makeStyles } from '@mui/styles';

interface SectionProps {
  content: string | React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    marginBottom: '7em',
    [theme.breakpoints.up('md')]: {
      marginLeft: '50%',
      transform: 'translateX(-50%)',
    },
  },
}));

const Section: React.FC<SectionProps> = (props) => {
  const { content } = props;
  const classes = useStyles();

  return (
    <Box className={classes.section}>
      <InView threshold={1}>
        {({ inView, ref }) => (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <Typography variant="h4">{content}</Typography>
          </motion.div>
        )}
      </InView>
    </Box>
  );
};

export default Section;
