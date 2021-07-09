import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Header, Body } from '../../components';
import { fetchCategories } from '../../features/categories';

function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className="home">
            <Header padding="15px 15px" />
            <Body></Body>
        </div>
    );
}

export default Home;
