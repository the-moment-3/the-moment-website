import { useEffect } from 'react';

interface AnimationConfig<T> {
  [key: string]: {
    heightOffsetRatio: number;
    className: string;
    ref: React.RefObject<T>;
  };
}

type RefsObject<T> = {
  [key: string]: React.RefObject<T>;
};

export const useAnimation = <T extends HTMLElement>(config: AnimationConfig<T>): RefsObject<T> => {
  const refs: RefsObject<T> = {};
  Object.keys(config).forEach((element) => {
    refs[element] = config[element].ref;
  });

  const handleScroll = () => {
    Object.keys(refs).forEach((element) => {
      const elementConfig = config[element];
      const ref = refs[element];
      if (ref.current && elementConfig) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * elementConfig.heightOffsetRatio) {
          ref.current.classList.add(elementConfig.className);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return refs;
};
