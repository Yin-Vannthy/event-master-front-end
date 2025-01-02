'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { CategoryCardComponent } from './CategoryCardComponent';

export const CategoryCardListComponent = ({ data }) => {

    return (
        <div>
            <Swiper
                spaceBetween={24}
                breakpoints={{
                    50: {
                        slidesPerView: 1.15,
                    },
                    640: {
                        slidesPerView: 1.15,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3.10
                    }
                }}
            >
                {data.payload?.map((x, index) => {
                    const imageUrl = x?.poster;
                    const isValidUrl = imageUrl?.startsWith('http://') || imageUrl?.startsWith('https://');
                    return (
                        <SwiperSlide key={index} >
                            <CategoryCardComponent
                                title={x?.eventName}
                                content={x?.description}
                                cate={x?.categoryName}
                                eventId={x?.eventId}
                                img={isValidUrl ? imageUrl : `https://firebasestorage.googleapis.com/v0/b/cloud-storage-next-8e2cc.appspot.com/o/paolo-feser-d6UCfbY3zMc-unsplash.jpg?alt=media&token=9624e26d-387d-4aa2-a802-f4065464745f`}
                            />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}