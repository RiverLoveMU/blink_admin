import * as React from "react";
import { Button, Upload } from "antd";
import * as XLSX from "xlsx";
import mammoth from "mammoth";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/es/upload";
import TextArea from "antd/es/input/TextArea";

const key = "excel_template_value";

const Index: React.FC = () => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || "{姓名}在{地址}有很多{金额}"
  );
  const [doc, setDoc] = React.useState<string[]>([]);

  const onChange = (e: UploadChangeParam) => {
    if (e.file.status === "done") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const workbook = XLSX.read(e.target?.result, { type: "binary" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const head = data.shift() as string[];
        const strArr: string[] = [];
        data.forEach((item) => {
          const line = item as string[];
          let text = value;
          for (let index = 0; index < line.length; index++) {
            const headText = `{${head[index]}}`;
            text = text.replace(headText, line[index]);
          }
          strArr.push(text);
        });

        setDoc(strArr);
      };
      reader.readAsBinaryString(e.file.originFileObj as any);
    }
    console.log(e);
  };

  const onInputChange = (e: any) => {
    setValue(e.target.value);
    localStorage.setItem(key, e.target.value);
  };

  return (
    <div>
      <Upload
        customRequest={(options) => {
          const { file, onSuccess } = options;
          onSuccess?.(file);
        }}
        accept=".xlsx, .xls"
        onChange={onChange}
      >
        <Button icon={<UploadOutlined rev={undefined} />}>excel上传</Button>
      </Upload>
      <div
        onClick={() => {
          mammoth
            .extractRawText({ path: "./a.docx" })
            .then(function (result) {
              const originalText = result.value; // 原始文本内容
              console.log(originalText);
            })
            .then(function () {
              console.log("新的Word文档已生成");
            })
            .catch(function (error) {
              console.error("出现错误:", error);
            });
        }}
      >
        111
      </div>
      <div style={{ height: 10 }}></div>
      <TextArea value={value} onChange={onInputChange}></TextArea>
      <div style={{ height: 50 }}></div>
      {doc.map((i) => {
        return <div key={i}>{i}</div>;
      })}
    </div>
  );
};

export default Index;
