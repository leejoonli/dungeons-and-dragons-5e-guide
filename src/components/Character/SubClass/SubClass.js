import React, { useEffect, useState } from 'react';
import Feature from '../Feature/Feature';
import styles from './SubClass.module.css';

function SubClass(props) {
    // state to store subClass data and the data on its levels
    const [subClass, setSubClass] = useState(null);
    const [subClassLevels, setSubClassLevels] = useState(null);

    // useEffect to fetch data from api
    useEffect(() => {
        fetch(`https://www.dnd5eapi.co/api/subclasses/${props.subclass}`)
            .then(res => res.json())
            .then(res => setSubClass(res))
            .catch(console.error)
        fetch(`https://www.dnd5eapi.co/api/subclasses/${props.subclass}/levels`)
            .then(res => res.json())
            .then(res => setSubClassLevels(res))
            .catch(console.error)
    }, [props]);

    return (
        <div>
            {subClass &&
            <>
                <h2 className={styles.subClassHeader}>{subClass.subclass_flavor}: {subClass.name}</h2>
                <p className={styles.subClassDesc}>{subClass.desc[0]}</p>
                {subClassLevels &&
                <>
                    {subClassLevels.map((element, index) => {
                        return (
                            <div key={`${element.index}-${index}`}>
                                <>
                                    {element.features.map((element) => {
                                        return (
                                            <div key={`${element.index}-${index}`}>
                                                <h4>{element.name}</h4>
                                                <Feature feature={element.index} />
                                            </div>
                                        )
                                    })}
                                </>
                            </div>
                        )
                    })}
                </>
                }
            </>
            }
        </div>
    );
}

export default SubClass;