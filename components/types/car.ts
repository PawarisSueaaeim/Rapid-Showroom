export type ICar = {
    vehicle_id: string;
    listing_vpark_id: string;
    brand: string;
    model: string;
    submodel: string;
    license_plate: string;
    color: string;
    gear_type: string;
    listing_price: number;
    mileage: number;
    year: string;
    brand_id: string;
    province: string;
    main_image: string;
}

export type IVehicleDetail = {
    brand: string,
    model: string,
    model_id: number,
    submodel: string,
    sub_model_id: number,
    license_plate: string,
    color: string,
    gear_type: string,
    listing_price: string | number,
    mileages: number,
    year: string,
    brand_id: number,
    province: string,
    listing_price_label: string,
    mileages_label: string
    main_image: string,
    gallery: [
        {
            url_path: string,
        }
    ]
}

export type DataVehicle = {
    vehicle_id: string;
    brand?: string;
    model: string;
    submodel: string;
    listing_price: number;
    mileage: number;
    year?: string;
    main_image: string;
};