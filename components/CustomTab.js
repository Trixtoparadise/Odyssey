import { Tab } from '@rneui/themed';
import React from 'react';

const CustomTab = (props) => {

    return (
        <Tab 
            value={props.Index} 
            onChange={(e) => props.SetIndex(e)}
            indicatorStyle={{
            backgroundColor: 'rgba(0, 44, 106, 255)',
            height: 5,
            }}
            containerStyle={{
            paddingVertical: 10,
            backgroundColor: 'white',
            }}
            
            variant='primary'
        >
            <Tab.Item 
            icon={{ name: 'home', type: 'feather', color: 'rgba(0, 44, 106, 255)', size: 35 }}
            />
            
            <Tab.Item 
            icon={{ name: 'send', type: 'feather', color: 'rgba(0, 44, 106, 255)', size: 35 }}
            />

            <Tab.Item 
            icon={{ name: 'swap', type: 'antdesign', color: 'rgba(0, 44, 106, 255)', size: 35 }}
            />

            <Tab.Item 
            icon={{ name: 'bell', type: 'feather', color: 'rgba(0, 44, 106, 255)', size: 35 }}
            />

        </Tab>
    );
}

export default CustomTab;