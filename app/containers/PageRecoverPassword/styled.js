import styled from "styled-components";

export const Recover = styled.div`
height: 100vh;
background-color: ${({ theme }) => theme.colors.bg1};
justify-content: center;
flex-direction: column;
.content{
	justify-content: center;
	flex-direction: column;
	background-color:  ${({ theme }) => theme.colors.white};;
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
	.secured{
		margin-bottom: 25px;
	}
}
.content2{
	height: auto;
	padding:70px 40px 20px 40px;
	@media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
		padding: 20px;
	  }
}
form{
	width: 100%;
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
.MuiChip-label{
	font-family: Poppins-Light;
}
.MuiChip-outlined{
	display: flex;
	 	  font-family: Poppins-Regular;
	  font-size: ${({ theme }) => theme.fontSizes.small};	
	  color: ${({ theme }) => theme.colors.white};
	  background-color: ${({ theme }) => theme.colors.gray2};
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
.text-helper{
	color: ${({ theme }) => theme.colors.gray2};
	letter-spacing: 0.1px;
	font-size: ${({ theme }) => theme.fontSizes.medium};	
	margin-top: 35px;
	width: 100%;
	text-align: center;
	font-size: ${({ theme }) => theme.fontSizes.small};	
	a{
		color: ${({ theme }) => theme.colors.link};
	}
}
}
`;
