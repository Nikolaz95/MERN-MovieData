import React from 'react'

//import css
import "./TrandingTabs.css";

//import components
import Button from '../../Buttons/Button';


const TrandingTabs = ({ title, activeTab, onTabClick }) => {
    return (
        <nav className='trendingTabsContent'>
            <h1>{title}</h1>

            <div className="trendingTabsBtns">
                <Button variant="trendingBtn" active={activeTab === 'day'}
                    onClick={() => onTabClick('day')}> Day
                </Button>

                <Button variant="trendingBtn" active={activeTab === 'week'}
                    onClick={() => onTabClick('week')}> Week
                </Button>
            </div>
        </nav>
    )
}

export default TrandingTabs