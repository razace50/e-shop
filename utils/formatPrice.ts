export const formatPrice =
(amount: number) =>{
    return new Intl.NumberFormat
    ('ne-NP', { //Use 'ne-NP' for nepali currency
        style: 'currency',
        currency:'NPR',
    }).format(amount)
};