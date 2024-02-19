import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepButton from '@mui/joy/StepButton';
import StepIndicator from '@mui/joy/StepIndicator';
import Check from '@mui/icons-material/Check';

const steps = ['Order placed', 'In review', 'Approved'];

export default function ButtonStepper() {
  const [activeStep, setActiveStep] = React.useState(1);
  return (
    <Stepper sx={{ width: '50%', margin: 'auto' }}>
      {steps.map((step, index) => (
        <Step
          key={step}
          indicator={
            <StepIndicator
              variant={activeStep <= index ? 'soft' : 'solid'}
              color={activeStep < index ? 'neutral' : 'success'} // Cambiado a 'success'
            >
              {activeStep <= index ? index + 1 : <Check sx={{ color: '#4CAF50' }} />} {/* Establecer color verde */}
            </StepIndicator>
          }
          sx={{
            '&::after': {
              ...(activeStep > index &&
                index !== 1 && { bgcolor: '#4CAF50' }), // Cambiar color verde
            },
          }}
        >
          <StepButton onClick={() => setActiveStep(index)}>{step}</StepButton>
        </Step>
      ))}
    </Stepper>
  );
}
