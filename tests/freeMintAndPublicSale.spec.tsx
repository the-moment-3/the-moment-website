import { fireEvent, render } from '@testing-library/react';
import { StepStatus } from '../src/constants/freeMintSteps';
import { FreeMintAndPublicSale } from '../src/components/FreeMintSteps/components/FreeMintAndPublicSale';

jest.mock('ice', () => {
  const Link = ({ to, children }) => {
    return <a href={to}>{children}</a>;
  };
  return {
    Link: Link,
  };
});

jest.mock('@/hooks/use-mint', () => ({
  useMint: () => {
    return {
      mint: jest.fn(),
    };
  },
}));

jest.mock('@/store', () => ({
  useModel: (str) => {
    return [
      {
        contractAddress: '0x00',
        perAddressMaxMintAmount: 5,
        allowListRemainAmount: 3,
        allowListTotalAmount: 3,
        publicPrice: 0.88,
      },
    ];
  },
}));

describe('Free mint calculator', () => {
  it('Should show the number of users whitelisted by default in free mint calculator [free-mint-0013] [free-mint-0014] [free-mint-0015]', () => {
    const { container, debug } = render(<FreeMintAndPublicSale status={StepStatus.WIN} />);
    const minusBtn = container.getElementsByClassName('minusBtn');
    const count = container.getElementsByClassName('count');
    const addBtn = container.getElementsByClassName('addBtn');

    expect(count[0].innerHTML).toBe('3');
    expect(minusBtn[0].className).toMatch('disabled');
    fireEvent.click(addBtn[0]);
    expect(count[0].innerHTML).toBe('4');
    expect(minusBtn[0].className).not.toMatch('disabled');
    fireEvent.click(addBtn[0]);
    expect(count[0].innerHTML).toBe('5');
    expect(addBtn[0].className).toMatch('disabled');
    fireEvent.click(minusBtn[0]);
    expect(count[0].innerHTML).toBe('4');
  });
});
