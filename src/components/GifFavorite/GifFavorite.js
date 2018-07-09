import React, { Component } from 'react';
import SearchBar from '../../UI/SearchBar';
import GifCards from '../GifCards/GifCards';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchFunctions from '../../actions/searchValues';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary'

class GifFavorite extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchedValue: "trendy", 
            searchResults: props.favoritedImages, 
        }
    }

    componentDidUpdate(prevProps) {
        console.log("Se actualiza");
        if(prevProps.favoritedImages !== this.props.favoritedImages){
            this.setState({searchResults: this.props.favoritedImages});
        }
    }

    updateState = (event) => {
        console.log(event);
        if(event === ""){
            this.setState({searchResults: this.props.favoritedImages})
        } else {
            this.setState({ searchedValue: event })
        }
    }

    handleSearch = () => {
        console.log(this.props.favoritedImages);
        //const searchParam = event.target.value;

        if(this.state.searchedValue === ""){
            this.setState({searchResults: this.props.favoritedImages})
        } else {
            let newArray = Object.keys(this.props.favoritedImages).map((key, index) => {
                return this.props.favoritedImages[index]
            }).filter(word => {
                console.log("WORD", word);
                console.log("SEARCHEDVALUE", this.state.searchedValue)
                return word.searchedValue.includes(this.state.searchedValue)});
            
            if(newArray !== undefined && newArray !== null && newArray.length >= 0){
                console.log("Entro a actualizar");
                this.setState({ searchResults: newArray });
            } 
        }
    }

    render() {
        return (
            <div className = "GifFavorite">
                    <SearchBar 
                    updateState = { this.updateState } 
                    handleSearch = { this.handleSearch } />
        
                <ErrorBoundary>
                    <GifCards 
                    gifData = { this.state.searchResults } 
                    searchedGifs = { this.props.searchedFavoriteGifs } 
                    searchedValue = { this.props.searchedValue }/>
                </ErrorBoundary>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state.favoritedImages);
    const { favoritedImages } = state;
    return {
        favoritedImages
    }
}

const mapDispatchToProps = (dispatch) => {
    const { searchedFavoriteGifs, searchedTrendingGifs, searchedSpecifiedGifs, updateSearchValue } = SearchFunctions.creators;
    return bindActionCreators( { searchedFavoriteGifs, searchedTrendingGifs, searchedSpecifiedGifs, updateSearchValue }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GifFavorite);