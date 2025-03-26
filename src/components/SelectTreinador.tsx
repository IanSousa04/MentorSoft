import React from 'react';
import { MenuItem, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { Treinador } from '../types';
import { treinadores } from '../data/mockData';

interface SelectTreinadorProps {
  value: Treinador | null;
  setValue: (obj: Treinador | null) => void;
}

const SelectTreinador: React.FC<SelectTreinadorProps> = ({ value, setValue }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const selecionado = treinadores.find(treinador => treinador.id === event.target.value);
    setValue(selecionado || null); // Atualiza o estado com o treinador selecionado ou null
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="treinador-select-label">Selecione um Treinador</InputLabel>
      <Select
        labelId="treinador-select-label"
        value={value ? value.id : ''}
        onChange={handleChange}
        label="Selecione um Treinador"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '& fieldset': {
              borderColor: '#1976d2', // Cor do border quando não focado
            },
            '&:hover fieldset': {
              borderColor: '#1565c0', // Cor do border quando em hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1565c0', // Cor do border quando em foco
            },
          },
          backgroundColor: "white"
        }}
      >
        <MenuItem value="">
          <em>Selecione um treinador...</em>
        </MenuItem>
        {treinadores.map((treinador) => (
          <MenuItem key={treinador.id} value={treinador.id}>
            {treinador.nome}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectTreinador;
