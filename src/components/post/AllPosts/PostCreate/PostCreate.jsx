import { Formik, Form, Field, ErrorMessage } from "formik";      
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Це обовязкове поле')
        .min(2, 'Повинно містити принаймні 2 символи')
        .max(30, 'Повинно бути не більше 30 символів'),
    content: Yup.string()
        .required('Це обовязкове поле')
        .min(2, 'Повинно містити принаймні 2 символи')
        .max(120, 'Повинно бути не більше 120 символів'),
})


export const PostCreate = ({CreatePost}) => {
    

    return(
        <div>
            <Formik
                initialValues={{
                    title: '',
                    content: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    CreatePost(values);
                    resetForm();
                }}
                
            >
                <Form className="create__form">
                    <h2 className="create__form__title">Створість нотатку</h2>
                    <div className="create__form__item">
                        <label htmlFor="title" className="create__form__label">Заголовок:</label>
                        <Field type="text" name="title" className="create__form__input"/>
                        <ErrorMessage name="title" component="div" className="create__form__error" />
                    </div>
                    <div className="create__form__item">
                        <label htmlFor="content" className="create__form__label">Зміст:</label>
                        <Field as="textarea" name="content" className="create__form__text"/>
                        <ErrorMessage name="content" component="div" className="create__form__error" />
                    </div>
                    <button type="submit" className="create__form__btn">Створити нотатку</button>
                </Form>
            </Formik>
        </div>    
    )
}