type Params = {
  height?: string,
  width?: string,
};

export default function Spacer({ height = '0px', width = '0px' }: Params) {
  return (
    <div style={{ height, width }} />
  );
}
