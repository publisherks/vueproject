import { onUnmounted } from "vue";

export const hook = () => {

    onUnmounted(() => {
        setup.event.forEach((event) => {
            document.removeEventListener("click", event);
        });

    });

    const setup = {
        event       : [],
        ignoreDom   : [],
        ignoreClass : [],
        accessClass : [],
        then        : () => {},
        value       : {
            new : "",
            old : "",
        },
    };

    const accessClass = (target) => {
        setup.accessClass = target;
        return {
            use,
        };
    };
    const ignoreDom   = (target) => {
        setup.ignoreDom = target;
        return {
            use,
        };
    };

    const ignoreClass = (target) => {
        setup.ignoreClass = target;
        return {
            use,
        };
    };

    const use = (event) => {
        setup.event.push(eval(event));
        document.addEventListener("click", eval(event));
        return {
            then : (callback) => {
                setup.then = callback;
            },
        };
    };

    const clickHook = (event) => {
        let ignore = false;
        let access = false;

        if (setup.value.new) {
            setup.value.old = setup.value.new || event.target;
        }
        if (event.target !== setup.value.new) {
            setup.value.new = event.target;
        }

        for (const eventElement of event.path) {
            if (eventElement.classList) {
                if (setup.ignoreClass.includes(eventElement.classList.toString())) {
                    ignore = true;
                    break;
                }
                if (setup.accessClass.includes(eventElement.classList.toString())) {
                    access = true;
                    break;
                }
            }
        }

        if (setup.accessClass.length !== 0 && access || setup.accessClass.length === 0 && setup.ignoreClass && !ignore) {
            return setup.then(setup.value.new, setup.value.old);
        }

    };

    return {
        use,
        ignoreDom,
        ignoreClass,
        accessClass,
    };
};
