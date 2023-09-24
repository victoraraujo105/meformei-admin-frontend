"use client"
import { useRef } from "react";
import { toast } from 'react-toastify';

export default function useToast(){
 
  const toastRef = useRef(toast);
  const setToastRef = (value: any)=> {
    toastRef.current = value
  }
  return{
    toastRef,
    setToastRef
  }
}