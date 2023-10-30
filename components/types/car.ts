export interface ICar {
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
    image: string;
}

export type IVehicleById = {
    brand: string,
    model: string,
    model_id: number,
    submodel: string,
    sub_model_id: number,
    license_plate: string,
    color: string,
    gear_type: string,
    listing_price: string,
    mileage: number,
    year: string,
    brand_id: number,
    province: string,
    listing_vpark_id: number,
    vehicle_id: number,
    listing_price_label: string,
    milage_label: string,
    main_image: string,
    gallery: [
        {
            sv_img_id: number,
            category: string,
            url_path: string,
        }
    ]
};