// import * as React from "react"

// const Card = React.forwardRef((props, ref) => {
//   const { className, ...rest } = props;
//   return (
//     <div
//       ref={ref}
//       className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
//       {...rest}
//     />
//   );
// });
// Card.displayName = "Card";

// const CardHeader = React.forwardRef((props, ref) => {
//   const { className, ...rest } = props;
//   return (
//     <div
//       ref={ref}
//       className={`flex flex-col space-y-1.5 p-6 ${className}`}
//       {...rest}
//     />
//   );
// });
// CardHeader.displayName = "CardHeader";

// const CardTitle = React.forwardRef((props, ref) => {
//   const { className, ...rest } = props;
//   return (
//     <h3
//       ref={ref}
//       className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
//       {...rest}
//     />
//   );
// });
// CardTitle.displayName = "CardTitle";

// const CardContent = React.forwardRef((props, ref) => {
//   const { className, ...rest } = props;
//   return (
//     <div ref={ref} className={`p-6 pt-0 ${className}`} {...rest} />
//   );
// });
// CardContent.displayName = "CardContent";

// export { Card, CardHeader, CardTitle, CardContent };