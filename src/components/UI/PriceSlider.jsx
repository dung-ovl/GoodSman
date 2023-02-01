import styled from 'styled-components';
import ReactSlider from 'react-slider'

const StyledSlider = styled(ReactSlider)`
    width: 100%;
    height: 25px;
`;

const StyledThumb = styled.div`
    height: 25px;
    line-height: 25px;
    width: 25px;
    text-align: center;
    background-color: #000;
    color: #fff;
    border-radius: 50%;
    cursor: grab;
`;

const Thumb = (props, state) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>;

const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${props => (props.index === 2 ? '#f00' : props.index === 1 ? '#0f0' : '#ddd')};
    border-radius: 999px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

const StyledContainer = styled.div`
    resize: horizontal;
    overflow: auto;
    width: 50%;
    max-width: 100%;
    padding-right: 8px;
`;

function PriceSlider({ props }) {
    return (
        <>
            <StyledContainer>
                <StyledSlider defaultValue={[50, 200]} renderTrack={Track} renderThumb={Thumb} min={props.min} max={props.max} />
            </StyledContainer>
        </>
    )
}

export default PriceSlider