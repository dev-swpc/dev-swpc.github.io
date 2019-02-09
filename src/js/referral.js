const saveRedirectParams = () => {
    if (localStorage.registerRedirectParams) {
        // already set, skipping
        return;
    }

    let referrerUrl = encodeURIComponent(document.referrer);
    let landingPage = encodeURIComponent(location.pathname + location.search);
    localStorage.registerRedirectParams = 'referrer=' + referrerUrl + '&landingPage=' + landingPage;
};

const REGISTER_URL = 'https://app.orderhub.io/register';

$(window).load(function () {
    saveRedirectParams();

    const buildAttributeStringWithRedirectParams = (attributeValue) => {
        let redirParams = localStorage.registerRedirectParams ? localStorage.registerRedirectParams : '';
        return attributeValue + (attributeValue.indexOf('?') !== -1 ? '&' : '?') + redirParams;
    };

    const appendRedirectParamsToAttribute = (element, attribute = 'href') => {
        let attrValue = element.getAttribute(attribute);
        element.setAttribute(attribute, buildAttributeStringWithRedirectParams(attrValue));
    };

    const tagToAttributeMap = {
        'a': [
            'href',
            'cta_dest_link'
        ],
        'form': [
            'action'
        ]
    };

    const addRedirectParamsToLinks = () => {
        for (let tagName in tagToAttributeMap) {
            let attributes = tagToAttributeMap[tagName];

            let elements = document.getElementsByTagName(tagName);

            for (let index in elements) {
                let element = elements[index];

                if (typeof element.getAttribute !== 'function') {
                    continue;
                }

                attributes.forEach(attribute => {
                    let attributeValue = element.getAttribute(attribute);

                    if (!attributeValue || attributeValue.indexOf(REGISTER_URL) !== 0) {
                        return;
                    }

                    appendRedirectParamsToAttribute(element, attribute);
                });
            }
        }
    };

    addRedirectParamsToLinks();
});
