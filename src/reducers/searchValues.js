import searchActions from '../actions/searchValues'

const initialState = {
    searchedValue: "trendy",
    gifs: [],
    favoritedImages: [],
};

const SearchReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case searchActions.types.ADD_REMOVE_GIF: {
            let newState = {...state};

            // REMOVING 
            if(newState.favoritedImages !== undefined && newState.favoritedImages !== null && newState.favoritedImages.length > 0){
                for(let a = 0; a <= newState.favoritedImages.length - 1; a++){
                    if(payload.id === newState.favoritedImages[a].id && state.gifs.length > 0){ 
                        let foundIndex = newState.gifs.findIndex( (x, index) => {
                            return x.id === payload.id;
                        });
                        if(foundIndex !== -1){
                            const newUpdatedGifData = [...state.gifs]; 
                            newUpdatedGifData[foundIndex].isFavorite = false;
                            return {...state, gifs: newUpdatedGifData, favoritedImages: [...state.favoritedImages.slice(0, a), ...state.favoritedImages.slice(a+1)]};
                        }
                        return {...state, favoritedImages: [...state.favoritedImages.slice(0, a), ...state.favoritedImages.slice(a+1)]};
                    } else if (payload.id === newState.favoritedImages[a].id) {
                        return {...state, favoritedImages: [...state.favoritedImages.slice(0, a), ...state.favoritedImages.slice(a+1)]};
                    }
                }
            }
            
            // ADDING 
            let foundIndex = newState.gifs.findIndex( (x, index) => {
                return x.id === payload.id;
            });

            const newUpdatedGifData = [...state.gifs]; 
            newUpdatedGifData[foundIndex].isFavorite = true;

            let payloadIsFavorite = {...payload};
            payloadIsFavorite.isFavorite = true;
            return {...state, gifs: newUpdatedGifData, favoritedImages: state.favoritedImages.concat(payloadIsFavorite)};
        }

        case searchActions.types.GET_TRENDING: 
        case searchActions.types.SEARCH_SPECIFIED_GIFS: {
            const { data } = payload.data;

            let newUpdatedGifData = data.map (key => {
                key.isFavorite = false;
                return key;
            })

            if(data.length > 0 && state.favoritedImages.length > 0){
                newUpdatedGifData = data.map (key => {
                    key.isFavorite = false;
                    return key;
                })

                for(let a = 0; a <= newUpdatedGifData.length - 1; a++){
                    for(let b = 0; b <= state.favoritedImages.length - 1; b++){
                        if( newUpdatedGifData[a].id === state.favoritedImages[b].id ) {
                            newUpdatedGifData[a].isFavorite = true;
                        } 
                    }
                }
            } 

            let newState = { ...state, gifs: newUpdatedGifData}
            return newState;
        }

        case searchActions.types.SEARCH_UPDATE_VALUE: {
            return {...state, searchedValue: payload.searchValue};
        }

        default: 
            return state;
    }
}

export default SearchReducer;