import styled from "styled-components";

export const Wrapper = styled.div`
height: 100vh;
background-color: ${({ theme }) => theme.colors.bg1};
justify-content: center;
flex-direction: column;
.content{
    background-color:  ${({ theme }) => theme.colors.white};
	padding: 70px 40px 100px 40px;
    border-radius: 12px;
    height: 467px;
	width: 39ch;
	position: relative;
	@media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
		width: 80%;
		padding: 20px;
		height: 420px;
	  }
}
.MuiChip-label{
	font-family: Poppins-Light;
}
.MuiChip-outlined{
  display: flex;
        font-family: Poppins-Regular;
    font-size: ${({ theme }) => theme.fontSizes.small};	
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.gray2};;
    border: none;
    border-radius: 10px;
    justify-content: space-between;
    padding: 0 5px;
	width: 182px;
    margin: auto;
	margin-bottom: 1.5rem;
}
.MuiChip-deleteIcon {
  width: 15px;
}
.MuiChip-deletable.MuiChip-outlinedPrimary:focus{
    background-color: ${({ theme }) => theme.colors.gray2};;
}
.MuiChip-deleteIconOutlinedColorPrimary{
  color: ${({ theme }) => theme.colors.white};
}
.title{
	font-size: ${({ theme }) => theme.fontSizes.large};	
	margin-bottom: 25px;
	text-align: center;
	font-family: Poppins-Medium;
	}

.with-back{
    position: absolute;
    top: 15px;
    left: 15px;
	.back{
		width: 15px;
		height: 15px;
	}
}
.text-helper{
	letter-spacing: 0.1px;
    font-size: ${({ theme }) => theme.fontSizes.small};
	margin: 15px 0 15px 15px;
    justify-content: flex-end;
	a{
		color: ${({ theme }) => theme.colors.link};
	}
}
}
`;
