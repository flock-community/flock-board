interface props {
  responsePromise: Promise<Response>;
  onSuccess?: () => void;
  onError?: () => void;
}

export function clientResponseHandler({
  responsePromise,
  onSuccess,
  onError,
}: props) {
  responsePromise
    .then((response) => {
      if (response.ok) {
        onSuccess && onSuccess();
      } else {
        onError && onError();
      }
    })
    .catch((error) => {
      onError && onError();
    });
}
