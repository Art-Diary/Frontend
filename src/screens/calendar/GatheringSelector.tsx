import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useFetchGatheringList} from '~/api/queries/gathering';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {SelectCountry} from 'react-native-element-dropdown';
import {imageDataset} from './imageDataset';
import {useIsFocused} from '@react-navigation/native';
import {IPicker} from './CalendarScreen';
import { showToast } from '~/components/common/modal/toastConfig';

interface GatheringSelectorProps {
  handleSelectorItems: (list: IPicker[]) => void;
  selectorItems: IPicker[];
  handleSelectedValue: (value: string) => void;
  selectedValue: string;
}

const GatheringSelector: React.FC<GatheringSelectorProps> = ({
  handleSelectorItems,
  selectorItems,
  handleSelectedValue,
  selectedValue,
}) => {
  const isFocused = useIsFocused();
  const [openLoading, setOpenLoading] = useState(false);
  const {
    data: gatheringList,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchGatheringList();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const settingGatheringSelector = () => {
    var list: IPicker[] = [];
    const image = {uri: imageDataset};

    list.push({
      label: '혼자',
      value: '-1',
      image: image,
    });
    for (let i = 0; i < gatheringList.length; i++) {
      list.push({
        label: gatheringList[i].gatherName,
        value: gatheringList[i].gatherId.toString(),
        image: image,
      });
    }
    list.push({
      label: '모두',
      value: '-2',
      image: image,
    });
    handleSelectorItems(list);
  };

  useEffect(() => {
    if (isSuccess) {
      settingGatheringSelector();
    }
    if (isError) {
      showToast("모임 목록 조회 실패:(")
    }
    if (isLoading) {
      setOpenLoading(true);
    } else {
      setOpenLoading(false);
    }
  }, [isSuccess, isError, isLoading]);

  return (
    <>
    <SelectCountry
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      imageStyle={styles.imageStyle}
      iconStyle={styles.iconStyle}
      maxHeight={200}
      value={selectedValue}
      data={selectorItems}
      valueField="value"
      labelField="label"
      imageField="image"
      placeholder="모임 선택"
      onChange={e => {
        handleSelectedValue(e.value);
      }}
    />
    {openLoading && <LoadingModal message="모임 목록 조회 중 :)" />}
    </>
  );
};

export default GatheringSelector;

/** style */
const styles = StyleSheet.create({
  dropdown: {
    width: '30%',
    backgroundColor: 'white',
    borderRadius: 22,
    paddingHorizontal: 8,
    borderColor: '#ff6f61',
    borderWidth: 1,
    marginTop: -8,
  },
  imageStyle: {
    width: 0,
    height: 0,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'omyu pretty',
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
    fontFamily: 'omyu pretty',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
