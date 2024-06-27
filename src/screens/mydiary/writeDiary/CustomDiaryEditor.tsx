import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {
  widthPercentage as wp,
  heightPercentage as hp,
} from '~/components/common/ResponsiveSize';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';
import FontFamilyStylesheet from '../../../assets/fonts/stylesheet';
import {CameraIcon} from '~/assets/images';
import {showPhoto} from './GetPhoto';

/**
 * TODO
 * - 초기 로딩에는 사진 추가 시 스크롤이 안되고, 재로딩하면 스크롤이 된다. => 화면 높이 문제?
 * - 사진 첨부하고 위치 이런거 저장하고 표시했다가 보여주기. (일단 디비 저장)
 * - 색상이 제대로 적용되도록 수정
 */

const colors = [
  '#000000',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#00FFFF',
];

interface EditorProps {
  handleEditorContent: (content: string) => void;
  editorContent: string;
}

const CustomDiaryEditor: React.FC<EditorProps> = ({
  handleEditorContent,
  editorContent,
}) => {
  const editorRef = useRef<RichEditor>(null);
  const scrollViewRef = useRef(null);
  const [fontColor, setFontColor] = useState('#3c4045');
  const [colorVisible, setColorVisible] = useState(false);

  const handleContentChange = (content: string) => {
    handleEditorContent(content);
  };

  const handlePhoto = () => (
    <TouchableOpacity onPress={() => showPhoto(editorRef)}>
      <CameraIcon />
    </TouchableOpacity>
  );

  const changeFontColor = (color: string) => {
    // editorRef.current?.focusContentEditor();
    editorRef.current?.setForeColor(color);
    setFontColor(color);
    setColorVisible(false);
  };

  const handleFontColor = () => (
    <FontColorTouch color={fontColor} onPress={() => setColorVisible(true)} />
  );

  const initialCSSText = {
    initialCSSText: `${FontFamilyStylesheet}`,
    backgroundColor: '#f6f6f6',
    contentCSSText: `font-family: omyu_pretty; font-size: 24px; color: ${fontColor}; height: 100%;`,
  };

  return (
    <Container>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        // contentContainerStyle={{maxHeight: '100%'}}
        style={styles.scrollView}>
        <RichEditor
          ref={editorRef}
          editorStyle={initialCSSText}
          initialContentHTML={editorContent}
          initialHeight={250}
          style={styles.editor}
          placeholder="전시회 감상 기록을 작성해주세요."
          onChange={descriptionText => {
            handleContentChange(descriptionText);
          }}
        />
      </ScrollView>
      {colorVisible && (
        <Contents isOverContent>
          {colors.map(color => (
            <FontColorTouch
              key={color}
              color={color}
              onPress={() => changeFontColor(color)}
            />
          ))}
        </Contents>
      )}
      <RichToolbar
        selectedIconTint="#ff6f61"
        iconTint="#3c4045"
        editor={editorRef}
        style={styles.toolbar}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.alignLeft,
          actions.alignCenter,
          actions.alignRight,
          actions.alignFull,
          // actions.fontSize,
          actions.insertImage,
          actions.foreColor,
          // actions.undo,
          // actions.redo,
        ]}
        iconMap={{
          [actions.insertImage]: handlePhoto,
          // [actions.fontSize]: handleFontSize,
          [actions.foreColor]: handleFontColor,
        }}
      />
    </Container>
  );
};

export default CustomDiaryEditor;

const Container = styled.View`
  flex: 1;
  background-color: #f6f6f6;
  border-radius: ${wp(5)}px;
  border-width: ${wp(2)}px;
  border-color: #d3d3d3;
`;
interface ColorItemProps {
  color: string;
}

const FontColorTouch = styled.TouchableOpacity<ColorItemProps>`
  width: ${wp(20)}px;
  height: ${wp(20)}px;
  background-color: ${(props: ColorItemProps) => props.color};
  border-width: ${wp(1.5)}px;
  border-color: #d3d3d3;
`;

interface ContentsProps {
  isOverContent: boolean;
}

const Contents = styled.View<ContentsProps>`
  flex-direction: row;
  width: 100%;
  padding-left: ${wp(10)}px;
  padding-right: ${wp(10)}px;
  padding-top: ${hp(5)}px;
  padding-bottom: ${hp(5)}px;
  gap: ${wp(10)}px;
  background-color: ${(props: ContentsProps) =>
    props.isOverContent ? `#d3d3d3` : `white`};
`;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  editor: {
    flex: 1,
    height: '100%',
    // flexGrow: 1,
    backgroundColor: '#f6f6f6',
    fontSize: 100,
  },
  toolbar: {
    backgroundColor: '#f6f6f6', // 툴바 배경색 변경
    borderColor: '#d3d3d3', // 툴바 경계 색 변경
    borderTopWidth: 1, // 경계 두께
  },
});

const FontSizeTouch = styled.TouchableOpacity`
  background-color: #f6f6f6;
  border-radius: ${wp(5)}px;
  border-width: ${wp(2)}px;
  border-color: #d3d3d3;
`;
