// rafce
import { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store'
import {
    // createProduct,
    readProduct,
    // listProduct,
    updateProduct
} from '../../api/product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
import { useParams, useNavigate } from 'react-router-dom'

const initialState = {
    title: "",
    description: "desc",
    price: 0,
    quantity: 0,
    categoryId: '',
    images: []
}
const FormEditProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)

    const [form, setForm] = useState(initialState)

    useEffect(() => {
        // code
        getCategory()
        fetchProduct(token, id, form)
    }, [])

    const fetchProduct = async (token, id, form) => {
        try {
            // code
            const res = await readProduct(token, id, form)
            // console.log('res from backend', res)
            setForm(res.data)
        } catch (err) {
            console.log('Err fetch data', err)
        }
    }
    console.log(form)

    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await updateProduct(token, id, form)
            console.log(res)
            toast.success(`ເພີ່ມຂໍ້ມູນ ${res.data.title} ສຳເລັດ`)
            navigate('/admin/product')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <form onSubmit={handleSubmit}>
                <h1>ເພີ່ມຂໍ້ມູນສິນຄ້າ</h1>
                <input
                    className='border'
                    value={form.title}
                    onChange={handleOnChange}
                    placeholder='Title'
                    name='title'
                />
                <input
                    className='border'
                    value={form.description}
                    onChange={handleOnChange}
                    placeholder='Description'
                    name='description'
                />
                <input
                    type='number'
                    className='border'
                    value={form.price}
                    onChange={handleOnChange}
                    placeholder='price'
                    name='price'
                />
                <input
                    type='number'
                    className='border'
                    value={form.quantity}
                    onChange={handleOnChange}
                    placeholder='quantity'
                    name='quantity'
                />
                <select
                    className='border'
                    name='categoryId'
                    onChange={handleOnChange}
                    required
                    value={form.categoryId}
                >
                    <option value="" disabled>ກະລຸນາເລືອກ</option>
                    {
                        categories.map((item, index) =>
                            <option key={index} value={item.id}>{item.name}</option>
                        )
                    }
                </select>
                <hr />
                {/* Upload file  */}
                <Uploadfile form={form} setForm={setForm} />

                <button className='bg-blue-500'>ແກ້ໄຂສິນຄ້າ</button>


                <hr />
                <br />

            </form>
        </div>
    )
}

export default FormEditProduct