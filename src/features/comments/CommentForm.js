import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { validateCommentForm } from '../../utils/validateCommentForm';
import { useDispatch } from 'react-redux';
import { addComment } from './commentsSlice';



const CommentForm = ({ campsiteId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const comment = {
        campsiteId: parseInt(campsiteId),
        rating: values.rating,
        author: values.author,
        text: values.commentText,
        date: new Date(Date.now()).toISOString()
    };
    dispatch(addComment(comment));
    setModalOpen(false);
  };

  return (
    <>
      <Button outline onClick={() => setModalOpen(true)}>
        <i className='fa fa-pencil fa-lg' /> Add Comment
      </Button>
      <Modal isOpen={modalOpen}>
        <ModalHeader toggle={() => setModalOpen(false)}>Add Comment</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              rating: undefined,
              author: '',
              commentText: ''
            }}
            onSubmit={handleSubmit}
            validate={validateCommentForm}
          >
            <Form>
              <FormGroup>
                <Label htmlFor='rating'>Rating</Label>
                <Field as='select' name='rating' className='form-control'>
                  <option>Select...</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </Field>
                <ErrorMessage name='rating'>{(msg) => <div className='text-danger'>{msg}</div>}</ErrorMessage>
              </FormGroup>
              <FormGroup>
                <Label htmlFor='author'>Your Name</Label>
                <Field type='text' name='author' className='form-control' />
                <ErrorMessage name='author'>{(msg) => <div className='text-danger'>{msg}</div>}</ErrorMessage>
              </FormGroup>
              <FormGroup>
                <Label htmlFor='commentText'>Comment</Label>
                <Field as='textarea' name='commentText' className='form-control' rows='6' />
              </FormGroup>
              <Button type='submit' value='submit' color='primary'>
                Submit
              </Button>
            </Form>
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CommentForm;