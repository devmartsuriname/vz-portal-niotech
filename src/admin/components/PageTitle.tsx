interface PageTitleProps {
  title: string;
  subName: string;
}

const PageTitle = ({ title, subName }: PageTitleProps) => {
  return (
    <div className="page-title-box">
      <h4 className="page-title">{title}</h4>
      <ol className="breadcrumb m-0">
        <li className="breadcrumb-item">{subName}</li>
        <li className="breadcrumb-item active">{title}</li>
      </ol>
    </div>
  );
};

export default PageTitle;
