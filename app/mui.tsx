import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';

// Define your custom steps
const steps = [
  'Select master blaster campaign settings',
  'Create an ad group',
  'Create an ad',
];

// Create a custom StepConnector with a different color
const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  [`& .MuiStepConnector-line`]: {
    borderColor: 'pink', // Change this to your desired color
  },
}));

const CustomStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor:
    ownerState.active || ownerState.completed
      ? theme.palette.primary.main
      : theme.palette.grey[300],
  zIndex: 1,
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
}));

function CustomStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <CustomStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <Check /> : <div className="circle" />}
    </CustomStepIconRoot>
  );
}

export default function HorizontalLinearAlternativeLabelStepper() {
  return (
    <Box sx={{ width: '50%' }}>
      <Stepper
        activeStep={1}
        alternativeLabel
        connector={<CustomStepConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
