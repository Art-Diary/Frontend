import React, {useState} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import Page from './Page';

interface ICarousel {
  gap: number;
  offset: number;
  pages: any[];
  pageWidth: number;
}

const Container = styled.View`
  height: 60%;
  justify-content: center;
  align-items: center;
`;

const Indicator = styled.View<{focused: boolean}>`
  margin: 0px 4px;
  background-color: ${props => (props.focused ? '#262626' : '#dfdfdf')};
  width: 6px;
  height: 6px;
  border-radius: 3px;
`;

const IndicatorWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

export default function Carousel({pages, pageWidth, gap, offset}: ICarousel) {
  const [page, setPage] = useState(0);

  function renderItem({item}: any) {
    return (
      <Page item={item} style={{width: pageWidth, marginHorizontal: gap / 2}} />
    );
  }

  const onScroll = (e: any) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap),
    );
    setPage(newPage);
  };

  return (
    <Container>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        data={pages}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item: any) => `page__${item.color}`}
        onScroll={onScroll}
        pagingEnabled
        renderItem={renderItem}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
      <IndicatorWrapper>
        {pages.map(i => (
          <Indicator key={`indicator_${i}`} focused={i === page} />
        ))}
      </IndicatorWrapper>
    </Container>
  );
}
