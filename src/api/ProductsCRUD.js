import axiosInstance from '../axios/axiosInstance';


export const getAllProducts = () =>   {
    return axiosInstance.get('api/products/')
}
export const getProductById = (id) =>   {
    return axiosInstance.get(`api/products/${id}`)
}

export const createProduct = (body) =>   {

    return axiosInstance.post('api/products/',{ ...body})
}
export const updateProduct = (id,body) =>   {

    return axiosInstance.put(`api/products/${id}`,{ ...body})
}

export const deleteProduct = (id) =>   {

    return axiosInstance.delete(`api/products/${id}`)
}

