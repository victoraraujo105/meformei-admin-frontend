import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as MeFormeiLogoSvg } from '../../assets/me-formei-logo.svg';

// Fade-in animation
export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Fade-out animation
export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(45deg, #f4f6f8, #e1e5e8);
  font-family: 'Poppins', sans-serif;
  animation: ${fadeIn} 1s ease-out; // Apply fade-in animation over 1 second
`;


export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  // Center the content
  position: relative;
  width: 90%;
  max-width: 18.75rem;
  padding: 1.2rem;
  border-radius: 2.5rem;
  box-shadow: 0 0.3125rem 1.25rem rgba(0, 0, 0, 0.1);
  background-color: #ffffff;

  @media (min-width: 48rem) {
    width: 18.75rem;
  }
`;

export const TitleContainer = styled.div`
  text-align: center;
`;

export const StyledLogoSvg = styled(MeFormeiLogoSvg)`
  width: 3.75rem;
  position: relative;
  margin-bottom: -1rem;
  path {
    fill: #007bff;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  color: #333;
  margin: 0;  // Removed bottom margin
`;

export const Subtitle = styled.h2`
  font-size: 1rem;
  text-align: center;
  text-weight: 200;
  color: #555;
  margin-top: 0rem;  // Add a small top margin for a slight separation
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 0.9rem;
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  color: #aaa;  // Setting a subtle color
  z-index: 1;
  pointer-events: none; 
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.625rem 2.5rem;
  padding-left: 2.5rem; // Space for the icon
  border: 1px solid #ddd;
  border-radius: 5rem;
  border-color: ${props => props.hasError ? 'red' : 'defaultColor'};
  font-size: 1rem;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
  position: relative; 
  z-index: 0; // Place input behind the icons

  &:focus {
    border-color: #007bff;
  }
`;

export const TogglePassword = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  cursor: pointer;
  color: #aaa; // Setting a subtle color
  z-index: 1;
`;

export const Button = styled.button`
  width: 100%;  // Adjust the width to fit the content
  padding: 0.625rem 1.5rem;  // Increase the horizontal padding for aesthetics
  // margin-top: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ErrorLabel = styled.div`
  color: red;
  font-size: 0.7rem;
  margin: -0.2rem 0.7rem 0.5rem;
  animation: ${props => props.fadeOut ? `${fadeOut} 1s ease-out` : 'none'};
`;

export const ActionLink = styled.a.attrs({ role: 'button', tabIndex: '0' })`
  color: #0077B5;   
  font-size: 0.8em;
  margin-right: 1em;
  text-decoration: none;
  cursor: pointer;
  
  &:hover, &:focus {
    text-decoration: underline;
    outline: none; // since we're providing custom focus styles
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const ActionLinksContainer = styled.div`
  margin-top: 1em;
  text-align: center;
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
  z-index: 10;
`;

export const ModalContent = styled.div`
  width: 24vw;  // Narrower modal
  background-color: #fff;
  border-radius: 3em;  // Fully rounded corners
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.15);
  overflow: hidden;
  padding: 1em .5em;

  header {
    padding: 1em;
    font-size: 1.6em;  // Bigger title
    font-weight: 600;
    text-align: center;
    color: #333;
  }

  p {
    padding: 1.5em;
    margin-top: -1.5em;
    margin-bottom: -1em;
    // line-height: 1.6;
    text-align: center;
    font-size: 1em;
    color: #333;
    word-wrap: break-word;  
  }

  button {
    display: block;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 2.5rem;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.8em 1.5em;
    margin: 1em auto;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export function InputField({ type, placeholder, icon, toggleIcon, onToggle, ...props }) {
  const handleMouseDown = (e) => {
    e.preventDefault();
    onToggle();
  };

  return (
    <InputWrapper>
      <StyledIcon icon={icon} />
      <Input type={type} placeholder={placeholder} aria-label={placeholder} {...props} />
      {toggleIcon &&
        <TogglePassword
          icon={toggleIcon}
          onMouseDown={handleMouseDown}
          aria-label="Alternar visibilidade da senha"
        />
      }
    </InputWrapper>
  );
}