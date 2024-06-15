const Credits = () => {
  return (
    <div className="main-content">
      <div className="container">
        <div className="row mb-3">
          <div className="col">
            <h2>Buy Credits</h2>
            <p>
              Keep Your Emails Flowing with Credits for Seamless Communication.
            </p>
            <div className="input-group">
              <input
                type="number"
                className="form-control rounded"
                placeholder="Enter the amount of credits"
                defaultValue={0}
              />
              <div className="input-group-append ps-3">
                <button className="btn btn-primary">Pay</button>
              </div>
            </div>
          </div>
          
        </div>
        <div className="row">
          <div className="col">
            <h3>Explore bundles</h3>
            <p>Save More with Bundles, Get Credits at Lower Prices.</p>
            <div className="container-fluid">
              <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                <div className="col">
                  <div className="card mb-4 rounded-3 shadow-sm">
                    <div className="card-header py-3">
                      <h4 className="my-0 fw-normal">Free</h4>
                    </div>
                    <div className="card-body">
                      <h1 className="card-title pricing-card-title">
                        $0<small className="text-muted fw-light">/mo</small>
                      </h1>
                      <ul className="list-unstyled mt-3 mb-4">
                        <li>10 users included</li>
                        <li>2 GB of storage</li>
                        <li>Email support</li>
                        <li>Help center access</li>
                      </ul>
                      <button
                        type="button"
                        className="w-100 btn btn-lg btn-outline-primary"
                      >
                        Free plan
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card mb-4 rounded-3 shadow-sm">
                    <div className="card-header py-3">
                      <h4 className="my-0 fw-normal">Pro</h4>
                    </div>
                    <div className="card-body">
                      <h1 className="card-title pricing-card-title">
                        $15<small className="text-muted fw-light">/mo</small>
                      </h1>
                      <ul className="list-unstyled mt-3 mb-4">
                        <li>20 users included</li>
                        <li>10 GB of storage</li>
                        <li>Priority email support</li>
                        <li>Help center access</li>
                      </ul>
                      <button
                        type="button"
                        className="w-100 btn btn-lg btn-primary"
                      >
                        Get started
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card mb-4 rounded-3 shadow-sm border-primary">
                    <div className="card-header py-3 text-white bg-primary border-primary">
                      <h4 className="my-0 fw-normal">Enterprise</h4>
                    </div>
                    <div className="card-body">
                      <h1 className="card-title pricing-card-title">
                        $29<small className="text-muted fw-light">/mo</small>
                      </h1>
                      <ul className="list-unstyled mt-3 mb-4">
                        <li>30 users included</li>
                        <li>15 GB of storage</li>
                        <li>Phone  support</li>
                        <li>Help center access</li>
                      </ul>
                      <button
                        type="button"
                        className="w-100 btn btn-lg btn-primary"
                      >
                        Contact us
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credits;
