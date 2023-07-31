import styled from "styled-components";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs"

function Pagination({ amount, next, prev, total, beginning, end, currentSlide }) {
//   functionality to create a new slidie and add the next set of data
const slide = [];
for (let i = 1; i < Math.ceil(total / amount); i++) {
    slide.push(i);
}

  return (
    <Container>
       {beginning ? null : <button className="prev-btn" onClick={() => prev()} disabled={beginning}>
            <BsArrowLeftCircle/>
        </button>}
        {end ? null : <button className="next-btn" onClick={() => next()} disabled={end}>
            <BsArrowRightCircle />
        </button>}
        <a className="slide-num flex j-center">
       {slide.map((index) => (
               <h2 className={index === currentSlide ? 'active' : ''} key={index}>{index}</h2>
        ))}</a>
    </Container>
  )
}

const Container = styled.div`
    .prev-btn {
        cursor: pointer;
        position: absolute;
        bottom: 22rem;
        left: 3rem;
        background-color: transparent;
        border-color: transparent;
        svg {
            font-size: 3rem;
            color: rgb(255, 205, 98);
        }
    }
    .next-btn {
        cursor: pointer;
        position: absolute;
        bottom: 22rem;
        left: 113.1rem;
        background-color: transparent;
        border-color: transparent;
        svg {
            font-size: 3rem;
            color: rgb(255, 205, 98);
        }
    }
    .slide-num {
        color: rgb(255, 205, 98);
        font-size: 1.5rem;
        position: relative;
        bottom: 11rem;
        gap: 0.5rem;
    }
    .slide-num h2.active {
        color: white;
    }
`;

export default Pagination;