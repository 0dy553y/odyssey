import React from 'react';
import { Box, Typography } from '@mui/material';
import { InView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

interface SectionProps {
  content: string;
}

const Section: React.FC<SectionProps> = (props) => {
  const { content } = props;

  return (
    <Box>
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
