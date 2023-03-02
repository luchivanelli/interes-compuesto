import { useFormik } from "formik";
import styled from "styled-components";
import { useState } from "react";
import * as Yup from 'yup'

const Control = styled.div`
    margin-bottom: 20px;
`

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    margin-left: 5px;
    font-size: 16px;
`

const MyInput = styled.input`
    margin-bottom: 5px;
    outline: none;
    border: none;
    border-bottom: 2px solid palevioletred;
    border-radius: 2px;
    width: 100%;
    padding: 5px 10px;
`

const ErroMessage = styled.div`
    color: palevioletred;
    font-weight: bold;
    margin-left: 5px;
`

const Button = styled.button`
    width: 100px;
    padding: 5px;
    border: 2px solid palevioletred;
    border-radius: 10px;
    margin-left: 5px;
    color: white;
    font-size: 16px;
    background-color: palevioletred;
    cursor: pointer;
    transition: all 0.6s;

    &:hover {
        background-color: white;
        color: palevioletred;
        transition: all 0.3s;
    }
`

const Result = styled.div`
    font-size: 20px;
    margin: 20px 5px 0;
`

const Form = ({formula})=> {
    const [balance, setBalance] = useState('')

    const formik = useFormik({
        initialValues: {
            deposit: '',
            contribution: '',
            years: '',
            rate: ''
        },
        onSubmit: ({deposit, contribution, years, rate}) => {
            const val = formula(deposit, contribution, years, rate)
            setBalance(val)
        },
        validationSchema: Yup.object({
            deposit: Yup.number().required('Campo obligatorio').min(0, 'El valor mínimo es 0'),
            contribution: Yup.number().required('Campo obligatorio').min(0, 'El valor mínimo es 0'),
            years: Yup.number().required('Campo obligatorio').min(0, 'El valor mínimo es 0'),
            rate: Yup.number().required('Campo obligatorio').min(0, 'El valor mínimo es 0').max(1,'El valor máximo es 1')
        })
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <Control>
                <Label>Depósito Inicial:</Label>
                <MyInput type="number" {...formik.getFieldProps('deposit')}/>
                {formik.touched.deposit && formik.errors.deposit ? <ErroMessage>{formik.errors.deposit}</ErroMessage> : null}
            </Control>
            <Control>
                <Label>Contribución anual:</Label>
                <MyInput type="number" {...formik.getFieldProps('contribution')}/>
                {formik.touched.contribution && formik.errors.contribution ? <ErroMessage>{formik.errors.contribution}</ErroMessage> : null}
            </Control>
            <Control>
                <Label>Años:</Label>
                <MyInput type="number" {...formik.getFieldProps('years')}/>
                {formik.touched.years && formik.errors.years ? <ErroMessage>{formik.errors.years}</ErroMessage> : null}
            </Control>
            <Control>
                <Label>Interés estimado:</Label>
                <MyInput type="number" {...formik.getFieldProps('rate')}/>
                {formik.touched.rate && formik.errors.rate ? <ErroMessage>{formik.errors.rate}</ErroMessage> : null}
            </Control>
            <Button type="submit">Calcular</Button>
            {balance !== '' ? <Result>Su balance final es de: ${balance}</Result> : null}
        </form>
    )
}

export default Form
