import * as yup from 'yup'

const CourseSchema = {
    category:yup.string().required('Kategori zorunludur!'),
    title:yup.string().required('Başlık zorunludur!'),
    summary:yup.string().required('Özet zorunludur!').min(5,'Minumum 5 karakter giriniz'),
    rating:yup.string().required('Kurs puanı girmek zorunludur!'),
    img:yup.string().required('Kurs resmi girmek zorunludur!').url('Lütfen geçerli bir url giriniz')
}

export default CourseSchema