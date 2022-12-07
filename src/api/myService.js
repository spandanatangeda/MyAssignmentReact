import { response } from './db';
import { formatApiData } from './../Utils'

export const getTransactions= ()=>{
  return Promise.resolve(formatApiData(response));
};

export const getCustomers = ()=>{
  return Promise.resolve(response.customers);
};
