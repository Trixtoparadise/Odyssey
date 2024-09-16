import { SearchBar } from '@rneui/themed';

const CustomSearchBar = (props) => {
    return (
        <SearchBar 
            placeholder={props.Title}
            inputStyle={{
                fontSize: 15
            }}
            containerStyle={{
            backgroundColor: 'white',
            borderColor: 'white',
            width: 250,
            }}
            inputContainerStyle={{
            backgroundColor: 'white',
            borderRadius: 15,
            borderWidth: 1,
            borderBottomWidth: 1,
            borderBottomColor: 'grey',
            height: 40,
            marginVertical: 5,
            paddingVertical: 4,
            paddingHorizontal: 6,
            }}  
        />
    );
}

export default CustomSearchBar;