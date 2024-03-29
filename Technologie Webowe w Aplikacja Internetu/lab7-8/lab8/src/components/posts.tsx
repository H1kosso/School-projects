import React, {useEffect, useState} from 'react';

const Posts: React.FC = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3100/api/posts');
                const result = await response.json();

                console.log(result)
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Ładowanie danych...</p>
            ) : (
                <div>
                    <ul style={{listStyleType: "none"}}>
                        {data.map((item, index) => (
                            <li key={index}>
                                <div>
                                    Tytuł: {item.title}
                                </div>
                                <div>
                                    {item.text}
                                </div>
                                    <img src={item.image} alt="None"/>
                                <hr/>
                            </li>

                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
export default Posts;