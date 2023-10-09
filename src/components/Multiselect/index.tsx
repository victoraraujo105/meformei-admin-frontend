import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { useFormikContext } from 'formik';
import { useState } from 'react';

interface MultiSelectChipTextFieldProps {
  fieldName: string;
  values: string[]; // Adicione um array de strings para representar os valores
  onAddChip: (chip: string) => void; // Função para adicionar um chip
  onDeleteChip: (chip: string) => void;
}

function MultiSelectChipTextField({ fieldName }: MultiSelectChipTextFieldProps) {
  const [inputValue, setInputValue] = useState('');
  const formik = useFormikContext<any>();

  const handleAddChip = () => {
    if (inputValue.trim()) {
      const newChips = [...formik.values[fieldName], inputValue.trim()];
      formik.setFieldValue(fieldName, newChips);
      setInputValue('');
    }
  };

  const handleDeleteChip = (chipToDelete: string) => {
    const newChips = formik.values[fieldName].filter((chip: string) => chip !== chipToDelete);
    formik.setFieldValue(fieldName, newChips);
  };



  return (
    <div>
      <div>
        {formik.values[fieldName].map((chip: string) => (
          <Chip
            key={chip}
            label={chip}
            onDelete={() => handleDeleteChip(chip)}
            variant="outlined"
            color="primary"
          />
        ))}
      </div>
      <TextField
        label="Add a chip"
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAddChip();
          }
        }}
      />
      <button type="button" onClick={handleAddChip}>
        Add
      </button>
    </div>
  );
}

export default MultiSelectChipTextField;