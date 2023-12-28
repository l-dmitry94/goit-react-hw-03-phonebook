import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
import { FormButton, FormInputStyle, FormLabel, FormStyle, StyledErrorMessage } from './ContactForm.styled';


const nameId = nanoid();
const numberId = nanoid();

const schema = yup.object({
    name: yup.string().max(12).required(),
    number: yup.string().min(6).max(12).required(),
});

const initialValues = {
    name: '',
    number: '',
};

const ContactForm = ({ onSubmit }) => {
    const handleSubmit = (values, { resetForm }) => {
        onSubmit(values);
        resetForm();
    };

    return (
        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
            <FormStyle autoComplete="on">
                <FormLabel htmlFor={nameId}>
                    Name:
                    <FormInputStyle
                        type="text"
                        name="name"
                        id={nameId}
                        autoComplete="on"
                        required
                    />
                    <StyledErrorMessage name="name" component="div"/>
                </FormLabel>
                <FormLabel htmlFor={numberId}>
                    Number:
                    <FormInputStyle
                        type="text"
                        name="number"
                        id={numberId}
                        autoComplete="on"
                        required
                    />
                    <StyledErrorMessage name="number" component="div"/>
                </FormLabel>

                <FormButton type="submit">Add contact</FormButton>
            </FormStyle>
        </Formik>
    );
};

export default ContactForm;

ContactForm.propTypes = {
    name: PropTypes.string,
    number: PropTypes.string,
    nameId: PropTypes.string,
    numberId: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
};
