import styled from 'styled-components';


const FeedList = styled.section`
  width: 100%;
  max-width: 580px;
  margin: 0 auto;
  padding: 0 20px;

  .post{
    width: 100%;
    background-color: #FFF;
    border: 1px solid #DDD;
    margin-top: 30px;
    border-radius: 3px;

    &__header{
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &__info{
        display: flex;
        flex-direction: column;
      }

      &__name{
        font-weight: 600;
        font-size: 13px;
      }

      &__place{
        font-style: italic;
        font-size: 11px;
        margin-top: 3px;
        color: #666;
      }
    }

    &__image{
      width: 100%;
    }

    &__footer{
      padding: 20px;

      &__actions{
        margin-bottom: 5px;
      }

      &__action{
        height: 20px;
        margin-right: 10px;
        background: transparent;
        border: none;
      }

      &__likes{
        font-weight: bolder;
      }

      &__description{
        font-size: 13px;
        margin-top: 2px;
        line-height: 18px;
      }

      &__hashtags{
        color: #7159c1;
        display: block;
      }
    }
  }
`;

const FeedListDois = styled.section`
  width: 100%;
  max-width: 580px;
  margin: 0 auto;
  padding: 0 20px;
`;


export { FeedList, FeedListDois };
