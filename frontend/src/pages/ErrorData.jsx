import ErrorIcon from '@mui/icons-material/Error';
const ErrorData = () => {
    return (
      <>
        <div
          style={{
            position: 'relative',
            height: "calc(100% - 274px)",
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: 767,
              width: '100%',
              lineHeight: 1.4,
              textAlign: 'center',
              padding: 15,
            }}
          >
            <div
              style={{
                position: 'relative',
                height: 220,
              }}
            >
              <p
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: 186,
                  fontWeight: 200,
                  margin: 0,
                  textTransform: 'uppercase',
                }}
              >
                <ErrorIcon fontSize="100"/>
              </p>
            </div>
            <h2
              style={{
                fontSize: 33,
                fontWeight: 200,
                textTransform: 'uppercase',
                marginBottom: 25,
                letterSpacing: 3,
              }}
            >
              Error fetching data!
            </h2>
          </div>
        </div>
      </>
    );
  };
  
  export default ErrorData;
  