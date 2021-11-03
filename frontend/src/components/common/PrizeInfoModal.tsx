import React, { Suspense } from 'react';
import { Box, Modal, Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from 'react-three-fiber';
import PrizeModel from 'components/map/composite/Prize';
import { PrizeWithChallengeName } from '../../pages/badge/BadgePage';

const useStyles = makeStyles((theme: Theme) => ({
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    padding: '1em',
    height: '20em',
    [theme.breakpoints.only('xs')]: {
      width: '80vw',
    },
    [theme.breakpoints.up('sm')]: {
      width: '400px',
    },
    borderRadius: '24px',
  },
  header: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    paddingTop: '0.4em',
  },
}));

interface PrizeInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  prize: PrizeWithChallengeName;
}

const PrizeInfoModal: React.FC<PrizeInfoModalProps> = ({
  isOpen,
  onClose,
  prize,
}) => {
  const classes = useStyles();
  return (
    <Suspense fallback={<div />}>
      <Modal open={isOpen} onClose={onClose}>
        <Box className={classes.modalBox}>
          <Box sx={{ marginTop: '2em', height: '50%' }}>
            <Canvas camera={{ zoom: 30 }} orthographic={true}>
              <ambientLight intensity={0.5} />
              <PrizeModel
                position={[0, 0, 0]}
                modelPath={prize.prizePath}
                scale={2}
              />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </Box>
          <Typography variant="h5" className={classes.header}>
            {prize.prizeName}
          </Typography>
          <Typography className={classes.description}>
            Awarded for completing the {prize.challengeName} challenge
          </Typography>
        </Box>
      </Modal>
    </Suspense>
  );
};

export default PrizeInfoModal;
