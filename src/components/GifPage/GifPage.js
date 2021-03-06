import React, {Component} from 'react';
import GifCards from '../GifCards/GifCards'
import SearchBar from '../../UI/SearchBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchFunctions from '../../actions/searchValues';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';
import { StyledGifPage } from './GifPage.styled'

class GifPage extends Component {

    componentDidMount() {      
        this.props.requestApiData();
    }

    handleSearch = () => {
        this.props.requestApiDataSearched();
    }

    updateState = (event) => {
        this.props.updateSearchValue({searchValue: event});
    }

    render() {
        let newArrayOfGifData = [];
        let newObjectOfGifData = {};

        if(this.props.gifs !== undefined ){
            for(let a = 0; a <= Object.keys(this.props.gifs).length - 1; a++){
                newObjectOfGifData = {};
                newObjectOfGifData.id = this.props.gifs[a].id;
                newObjectOfGifData.url = this.props.gifs[a].images.downsized.url;
                newObjectOfGifData.isFavorite = this.props.gifs[a].isFavorite;
                newArrayOfGifData.push(newObjectOfGifData);
            }
        }

        return(
            <StyledGifPage {...this.props}>
                <SearchBar 
                updateState = { this.updateState } 
                handleSearch = {this.handleSearch} />

                <ErrorBoundary>
                    <GifCards 
                    gifData = { newArrayOfGifData } 
                    addRemoveGif = {this.props.addRemoveGifFavorites} 
                    searchedValue = {this.props.searchedValue}/> 
                </ErrorBoundary>        
            </StyledGifPage>)
    }
}

const mapStateToProps = (state) => {
    const { gifs, searchedValue } = state;
    return {
        gifs, searchedValue
    }
}

const mapDispatchToProps = (dispatch) => {
    const { addRemoveGifFavorites, updateSearchValue, requestApiData, requestApiDataSearched } = SearchFunctions.creators;
    return bindActionCreators( { addRemoveGifFavorites, updateSearchValue, requestApiData, requestApiDataSearched }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GifPage);