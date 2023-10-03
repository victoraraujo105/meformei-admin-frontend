import axios, { AxiosPromise } from 'axios';

const ibgeService = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/',
});

export const getEstados = () : AxiosPromise<Estado[]>  => {
  return ibgeService.get('estados');
};

export const getCidadesPorEstado = (estado: string) : AxiosPromise<Cidade[]>  => {
  return ibgeService.get(`estados/${estado}/municipios`);
};

export const getDistritosPorMunicipio = (municipio: string) => {
  return ibgeService.get(`municipios/${municipio}/distritos`)
}

export interface Estado {
  id: string;
  nome: string;
}

export interface Cidade {
  id: string;
  nome: string;
}