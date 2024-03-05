import { Card, } from '@mui/joy';
import React, { useContext, useEffect, useState } from 'react';
import s from './Vacancies.module.css'
import { UserContext } from '../../context/user-context';
import { getDocs } from 'firebase/firestore';
import Vacancy from './Vacancy';
import Filters from './Filters';

const Vacancies = () => {

    const [vacanciesList, setVacanciesList] = useState([])
    const { vacanciesCollectionRef } = useContext(UserContext)
    const [filteredList, setFilteredList] = useState(vacanciesList);
    const [vesselTypeSelected, setVesselType] = useState([]);


    const getSelectedTypes = (vesselTypes) => {
        // return vesselTypes
        // return console.log(vesselTypes)
        setVesselType(vesselTypes)
    }

    const filterByVesselType = (filteredData) => {
        // Avoid filter for empty string
        if (!vesselTypeSelected) {
            return filteredData;
        }

        const filteredVacancies = filteredData.filter(
            // (vacancy) => vacancy.vesselType === vesselType
            // (vacancy) => vacancy.vesselType.split(" ").indexOf(vesselTypeSelected) !== -1
            (vacancy) => vacancy.vesselType.indexOf(vesselTypeSelected) !== -1
            // (vacancy) => vacancy.vesselType.includes(vesselType)
        );
        return filteredVacancies;
    };


    useEffect(() => {
        const getVacanciesList = async () => {
            try {
                const data = await getDocs(vacanciesCollectionRef)
                const vacanciesData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setVacanciesList(vacanciesData)
            } catch (err) {
                console.log(err)
            }
        }
        var filteredData = filterByVesselType(vacanciesList);
        setFilteredList(filteredData);
        getVacanciesList()
        console.log(filteredList)
    }
        , [vesselTypeSelected])
    return (
        <div>
            <div>Opened Vacancies </div>
            <div className={s.vacancies}>
                <div className={s.filter}>
                    <Card
                        variant="outlined"
                        sx={{ width: 400, maxWidth: '100%', gap: 1.5 }}
                    >
                        Filter
                        <div className={s.filters}>
                            <Filters vesselType={vacanciesList.map((vacancy) => vacancy.vesselType)}
                                rank={vacanciesList.map((vacancy) => vacancy.rank)}
                                vacanciesList={vacanciesList}
                                getSelectedTypes={getSelectedTypes}
                            />
                        </div>
                    </Card>
                </div>
                <div className={s.card}
                >
                    {filteredList.map((vacancy) => (
                        <Vacancy
                            key={vacancy.id}
                            rank={vacancy.rank} vesselType={vacancy.vesselType}
                            salary={vacancy.salary} joinDate={vacancy.joinDate}
                            duration={vacancy.duration} id={vacancy.id}
                            visa={vacancy.visa} englishLevel={vacancy.englishLevel}
                            prefferedCitizenship={vacancy.prefferedCitizenship}
                            vesselBuildYear={vacancy.vesselBuildYear} vesselFlag={vacancy.vesselFlag}
                            vesselDwt={vacancy.vesselDwt} vesselMainEngine={vacancy.vesselMainEngine}
                            crewOnboard={vacancy.crewOnboard} sailingArea={vacancy.sailingArea}
                            additionalInfo={vacancy.additionalInfo}
                        />
                    ))
                    }
                </div >
            </div>
        </div >
    )
}

export default Vacancies